import { Button, Link, Stack } from "@mui/material"

const SettingsLegalInfo = () => {
  return (
    <Stack
      sx={{ position: "fixed", bottom: 50, right: 20, textAlign: "center" }}
      direction="column"
    >
      <Link
        href="https://buy.stripe.com/eVa28w2K9bRM65i4gh"
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