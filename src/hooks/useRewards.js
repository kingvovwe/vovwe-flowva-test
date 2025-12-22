import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export const useRewards = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasClaimedToday, setHasClaimedToday] = useState(false);

  const fetchData = useCallback(async () => {
    if (!user) {
      setLoading(false); 
      return;
    }

    try {
      // Fetch Profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch ALL Rewards
      const { data: rewardsData, error: rewardsError } = await supabase
        .from('rewards')
        .select('*')
        .order('points_required', { ascending: true });

      if (rewardsError) throw rewardsError;
      setRewards(rewardsData);

      // Check has claimed today
      const today = new Date().toISOString().split('T')[0];
      const { data: checkins } = await supabase
        .from('daily_checkins')
        .select('*')
        .eq('user_id', user.id)
        .eq('check_in_date', today);

      if (checkins && checkins.length > 0) {
        setHasClaimedToday(true);
      } else {
        setHasClaimedToday(false);
      }

    } catch (err) {
      console.error("Error fetching data:", err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const claimDailyPoints = async () => {
    if (!user || hasClaimedToday) return;

    try {
      const today = new Date().toISOString().split('T')[0];

      // Save check-in
      const { error: checkinError } = await supabase
        .from('daily_checkins')
        .insert({ user_id: user.id, check_in_date: today });

      if (checkinError) throw checkinError;

      // Increase Points (+5) and Streak (+1)
      const newPoints = (profile?.points || 0) + 5;
      const newStreak = (profile?.streak_count || 0) + 1;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ points: newPoints, streak_count: newStreak })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Update Frontend
      setProfile(prev => ({ ...prev, points: newPoints, streak_count: newStreak }));
      setHasClaimedToday(true);
      
      return true;

    } catch (err) {
      alert("Error: " + err.message);
      return false;
    }
  };

  return { profile, rewards, loading, claimDailyPoints, hasClaimedToday };
};