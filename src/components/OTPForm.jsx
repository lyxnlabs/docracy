import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const OTPForm = () => {
  useEffect(() => {
    handleOTPEntry();
  }, [])
  
  const SwalReact = withReactContent(Swal);

  const handleOTPEntry = () => {
    SwalReact.fire({
      title: "OTP Entry",
      html: (
        <div>
          <input
            type="text"
            id="otp"
            className="swal2-input"
            placeholder="Enter OTP"
          />
        </div>
      ),
      confirmButtonText: "Submit",
      focusConfirm: false,
      preConfirm: () => {
        const otp = Swal.getPopup().querySelector("#otp").value;
        if (!otp) {
          Swal.showValidationMessage("Please enter the OTP");
        }
        return otp;
      },
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          "OTP Submitted!",
          `You entered OTP: ${result.value}`,
          "success"
        );
      }
    });
  };

  return <></>;
};

export default OTPForm;
