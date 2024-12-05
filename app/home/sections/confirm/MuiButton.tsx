"use client";
import Button from "@mui/material/Button";
import revalidatePage from "@/app/api/server_actions/revalidatePage";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";

//---------------------------------------------------------

const MuiButton = ({ text }: { text: string }) => {
  const pathname = usePathname();

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
        }).then((result: any) => {
          if (result.isConfirmed) {
            revalidatePage(pathname);
          }
        });
      }}
    >
      {text}
    </Button>
  );
};

export default MuiButton;
