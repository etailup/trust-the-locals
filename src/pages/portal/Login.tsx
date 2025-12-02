import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        toast.success('Welcome back!');
      } else {
        await register(email, password, name);
        toast.success('Account created successfully!');
      }
      navigate('/portal/dashboard');
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-portal-navy flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="font-luxury text-4xl md:text-5xl text-portal-off-white tracking-widest mb-2">
            Trust the Locals
          </h1>
          <p className="text-portal-off-white/80 text-sm tracking-wider">PRIVATE ACCESS</p>
          
          {/* Decorative Divider */}
          <div className="mt-6 flex items-center justify-center">
            <div className="h-12 w-px bg-portal-off-white/80"></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-portal-off-white/5 backdrop-blur-sm border border-portal-off-white/20 rounded-lg p-8">
          <h2 className="font-luxury text-2xl text-portal-off-white mb-6 text-center">
            {isLogin ? 'Welcome Back' : 'Request Access'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-portal-off-white/80">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  className="bg-portal-off-white/10 border-portal-off-white/30 text-portal-off-white placeholder:text-portal-off-white/40 focus:border-portal-off-white"
                  placeholder="Enter your name"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-portal-off-white/80">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-portal-off-white/10 border-portal-off-white/30 text-portal-off-white placeholder:text-portal-off-white/40 focus:border-portal-off-white"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-portal-off-white/80">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-portal-off-white/10 border-portal-off-white/30 text-portal-off-white placeholder:text-portal-off-white/40 focus:border-portal-off-white"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="outline"
              className="w-full border-portal-off-white bg-portal-off-white text-portal-navy hover:bg-portal-navy hover:text-portal-off-white hover:border-portal-navy transition-all duration-300 font-medium"
            >
              {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Request Access'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => isLogin ? navigate('/apply') : setIsLogin(true)}
              className="text-portal-off-white/80 hover:text-portal-off-white text-sm transition-colors"
            >
              {isLogin ? "Don't have access? Request here" : 'Already have access? Sign in'}
            </button>
          </div>
        </div>

        <p className="text-portal-off-white/60 text-xs text-center mt-8">
          Exclusive access for verified agencies and clients only
        </p>
      </div>
    </div>
  );
};

export default Login;
