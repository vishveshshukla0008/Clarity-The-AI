import { MailCheck } from "lucide-react";
import { useSelector } from "react-redux";
import AuthLoader from "../components/authLoader";
import { Button } from "@/components/ui/button";
import { Navigate, useLocation, useNavigate } from "react-router";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  if (!location.state?.emailSent) {
    return <Navigate to="/login" replace />;
  }

  const { loading, user } = useSelector((state) => state.auth);

  if (loading)
    return <AuthLoader content={"We are sending you confirmation email"} />;

  if (user) return;

  return (
    <div className="min-h-[80vh] bg-transparent w-full flex justify-center items-center px-4">
      <div className="bg-[#13132b] shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-5">
        <div className="flex justify-center">
          <MailCheck size={48} className="text-white" />
        </div>

        <h1 className="text-2xl font-semibold text-white">Verify Your Email</h1>

        <p className="text-white/80 leading-relaxed">
          A confirmation email has been sent to your registered email address{" "}
          <span className="font-bold text-white">{location?.state?.email}</span>
          . Please check your inbox and click the verification link to activate
          your account.
        </p>

        <p className="text-gray-300 text-sm">
          After verifying your email, you can return and login to your account.
        </p>

        <Button
          onClick={() => navigate("/login")}
          className="w-full bg-[#11111a] text-md">
          Go to login
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
