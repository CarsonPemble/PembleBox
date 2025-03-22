
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxxyrxdiuthsiggznhoy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94eHlyeGRpdXRoc2lnZ3puaG95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1ODU0MDQsImV4cCI6MjA1ODE2MTQwNH0.UnnNpV1r-oHw5hiIcPmEzeblM3xx1i2hIscQo1FlJW8';

export const supabase = createClient(supabaseUrl, supabaseKey);
