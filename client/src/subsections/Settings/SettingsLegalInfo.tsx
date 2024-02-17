import { Button, Link, Stack } from "@mui/material"

const SettingsLegalInfo = () => {
  return (
    <Stack
      sx={{ textAlign: "center" }}
      direction="column"
      component="section"
    >
      <Link
        href="https://www.paypal.com/donate/?hosted_button_id=4DEGPD3M2D8YS"
        target="_blank"
        underline="hover"
      >
        <Button>donate</Button>
      </Link>
      <Link
        href="https://www.termsfeed.com/live/67488f52-ba8a-4438-bd5d-f9fc93cbbae6"
        target="_blank"
        underline="hover"
      >
        Privacy Policy
      </Link>
      <Link
        href="https://www.termsandconditionsgenerator.com/live.php?token=R3tNAWErbhtEm3XDOzzsmD8SX1H77NVR"
        target="_blank"
        underline="hover"
      >
        Terms and Conditions
      </Link>
    </Stack>
  )
}

export default SettingsLegalInfo
