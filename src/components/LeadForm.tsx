import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { leadSchema, type LeadFormData } from "@/lib/validation";
import MantraCareLogo from "@/assets/MantraCare_Logo.svg";
import { User, Mail, Building2, Phone, ArrowRight, Loader2 } from "lucide-react";

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => Promise<void>;
}

const LeadForm = ({ onSubmit }: LeadFormProps) => {
  const [phone, setPhone] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    mode: "onChange",
    defaultValues: { fullName: "", workEmail: "", phone: "", organizationName: "" },
  });

  const handlePhoneChange = (value: string | undefined) => {
    const v = value || "";
    setPhone(v);
    setValue("phone", v, { shouldValidate: true });
    trigger("phone");
  };

  const onFormSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.15 * i, duration: 0.4 },
    }),
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-md rounded-2xl p-6 shadow-xl sm:p-8"
      >
        <div className="mb-6 flex items-center justify-center">
          <img src={MantraCareLogo} alt="Mantra Care" className="h-8" />
        </div>

        <h2 className="mb-1 text-center text-xl font-bold text-foreground sm:text-2xl">
          Tell us about yourself
        </h2>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Fill in your details to spin the wheel
        </p>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Full Name */}
          <motion.div custom={0} initial="hidden" animate="visible" variants={fieldVariants}>
            <Label htmlFor="fullName" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              {...register("fullName")}
              className={errors.fullName ? "border-destructive" : ""}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>
            )}
          </motion.div>

          {/* Work Email */}
          <motion.div custom={1} initial="hidden" animate="visible" variants={fieldVariants}>
            <Label htmlFor="workEmail" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              Work Email
            </Label>
            <Input
              id="workEmail"
              type="email"
              placeholder="you@company.com"
              {...register("workEmail")}
              className={errors.workEmail ? "border-destructive" : ""}
            />
            {errors.workEmail && (
              <p className="mt-1 text-xs text-destructive">{errors.workEmail.message}</p>
            )}
          </motion.div>

          {/* Phone */}
          <motion.div custom={2} initial="hidden" animate="visible" variants={fieldVariants}>
            <Label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
              Phone Number
            </Label>
            <PhoneInput
              international
              defaultCountry="IN"
              value={phone}
              onChange={handlePhoneChange}
              className={errors.phone ? "[&_.PhoneInputInput]:border-destructive" : ""}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
            )}
          </motion.div>

          {/* Organization */}
          <motion.div custom={3} initial="hidden" animate="visible" variants={fieldVariants}>
            <Label htmlFor="organizationName" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
              <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
              Organization
            </Label>
            <Input
              id="organizationName"
              placeholder="Acme Corp"
              {...register("organizationName")}
              className={errors.organizationName ? "border-destructive" : ""}
            />
            {errors.organizationName && (
              <p className="mt-1 text-xs text-destructive">{errors.organizationName.message}</p>
            )}
          </motion.div>

          <motion.div custom={4} initial="hidden" animate="visible" variants={fieldVariants}>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="brand-gradient mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Continue to Spin
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default LeadForm;
