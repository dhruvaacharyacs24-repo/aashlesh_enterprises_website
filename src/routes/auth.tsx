import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin Login" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
const ADMIN_EMAIL=import.meta.env.VITE_ADMIN_EMAIL;
type FormValues = z.infer<typeof schema>;

function AuthPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    if (values.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
  toast.error("Unauthorized admin account.");
  return;
}
    setLoading(true);
    try {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        if (error) throw error;
        toast.success("Signed in");
      
      navigate({ to: "/admin" });
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <div className="container-page py-16 max-w-md">
        <div className="eyebrow">Admin</div>
        <h1 className="mt-2 font-display text-3xl font-bold">
          {"Admin Sign In"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {"Only authorized administrators can access this panel."}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-4 border border-border bg-card p-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" {...register("email")} className="rounded-none mt-1.5" />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" autoComplete={"current-password"} {...register("password")} className="rounded-none mt-1.5" />
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
          </div>
          <Button type="submit" size="lg" className="rounded-none" disabled={loading}>
            {loading ? "Please wait..." : "Sign In"}
          </Button>
        </form>

        <Link to="/" className="mt-6 inline-block text-sm text-muted-foreground hover:text-primary">
          ← Back to site
        </Link>
      </div>
    </SiteLayout>
  );
}
