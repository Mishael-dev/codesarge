"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User } from "lucide-react";



export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        const { error: insertError } = await supabase
          .from("Users")
          .insert([
            {
              email,
              full_name: fullName,
              username: email.split("@")[0],
              role: "student",
            },
          ]);

        if (insertError) {
          setError(insertError.message);
        } else {
          router.push("/login");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#111111]">Create Account</h1>
          <p className="text-[#555555] mt-2">Join our community today</p>
        </div>

        <form className="space-y-6" onSubmit={handleSignUp}>
          {error && (
            <div className="p-3 bg-[#F8D7DA] border border-[#DC3545] text-[#721C24] rounded">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888888] h-4 w-4" />
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10 border-[#CCCCCC] focus:border-[#F4703A] focus:ring-[#F4703A]"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888888] h-4 w-4" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-[#CCCCCC] focus:border-[#F4703A] focus:ring-[#F4703A]"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888888] h-4 w-4" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 border-[#CCCCCC] focus:border-[#F4703A] focus:ring-[#F4703A]"
                placeholder="Choose a password"
                required
                minLength={6}
              />
            </div>
          </div>

          <Button
            className="w-full bg-[#F4703A] hover:bg-[#D65E2F] text-white"
            disabled={loading}
            type="submit"
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>

          <p className="text-center text-[#555555]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#F4703A] hover:text-[#D65E2F] font-medium"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
