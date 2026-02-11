
-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  work_email TEXT NOT NULL UNIQUE,
  phone_country TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  organization_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create spins table
CREATE TABLE public.spins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  reward_won TEXT NOT NULL,
  reward_probability NUMERIC NOT NULL,
  spun_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spins ENABLE ROW LEVEL SECURITY;

-- Public insert policy for leads (booth visitors aren't authenticated)
CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read leads by email" ON public.leads FOR SELECT USING (true);

-- Public insert policy for spins
CREATE POLICY "Anyone can insert spins" ON public.spins FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read spins" ON public.spins FOR SELECT USING (true);

-- Unique constraint: one spin per lead
ALTER TABLE public.spins ADD CONSTRAINT one_spin_per_lead UNIQUE (lead_id);
