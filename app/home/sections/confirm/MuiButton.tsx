"use client";
import Button from "@mui/material/Button";
import revalidateHome from "@/app/api/server_actions/revalidateHome";
import Swal from "sweetalert2";

//---------------------------------------------------------

const MuiButton = ({ text }: { text: string }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      color="success"
      onClick={async () => {
        Swal.fire({
          title: "Are you sure you want to confirm?",
          html: "<span style='text-align:left'>Scroll down and review the details of your booking, such as the <b>meeting point and time</b> carefully before confirming.</span>",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "I have read the details, confirm!",
          confirmButtonColor: "#6A914F",
          cancelButtonText: "I'll have a look again",
          cancelButtonColor: "rgb(202,106,106)",
          //set backdrop class to .backdrop-swal2
          backdrop: `
                    rgba(0,0,0,0.4)
                    url("/images/nybg.jpg")
                    center
                    no-repeat
                  `,

          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            revalidateHome();
          }
        });
      }}
    >
      {text}
    </Button>
  );
};

export default MuiButton;
