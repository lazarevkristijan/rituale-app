import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../Store"
import { useSelector } from "react-redux"

const Home = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.session.user)
  const language = useSelector((state: RootState) => state.settings.language)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{ textAlign: "center", mb: 3, fontWeight: 300, fontSize: 40 }}
        variant="h1"
      >
        {language === "en"
          ? "TIME TO MAKE REAL CHANGE"
          : language === "es"
          ? "TIEMPO DE HACER UN CAMBIO REAL"
          : language === "de"
          ? "ZEIT FÜR ECHTEN WANDEL"
          : language === "fr"
          ? "IL EST TEMPS D'APPORTE UN VRAI CHANGEMENT"
          : "TEMPO DI APPORTARE UN VERO CAMBIAMENTO"}{" "}
      </Typography>
      <Button
        sx={{ mx: "auto" }}
        onClick={() => navigate(user ? "/habits" : "/login")}
      >
        {user
          ? language === "en"
            ? "continue"
            : language === "es"
            ? "continuar"
            : language === "de"
            ? "weiter"
            : language === "fr"
            ? "continuer"
            : "continuare"
          : language === "en"
          ? "login"
          : language === "es"
          ? "iniciar sesión"
          : language === "de"
          ? "anmelden"
          : language === "fr"
          ? "se connecter"
          : "accedi"}
      </Button>
      <p>
        {language === "en"
          ? "Hello"
          : language === "es"
          ? "Hola"
          : language === "de"
          ? "Hallo"
          : language === "fr"
          ? "Bonjour"
          : "Ciao"}{" "}
        {user ? user.first_name : "Guest"}
        <img
          src={`/flags/${language}.svg`}
          alt={`${language} flag`}
          width={20}
          height={20}
        />
      </p>
      <Typography variant="overline">
        {language === "en"
          ? "Why habits?"
          : language === "es"
          ? "Por qué hábitos?"
          : language === "de"
          ? "Warum Gewohnheiten?"
          : language === "fr"
          ? "Pourquoi les habitudes?"
          : "Perché le abitudini"}
      </Typography>
      <Typography>
        {language === "en"
          ? "We don't realise that 90% of our day is habits based, almost everything we do is something we've been doing continously every day. Brushing our teeth, driving, scrolling our phones etc. it's all automatic, we don't put any effort in no natter how easy or hard the task, eventually we get into the rhythm."
          : language === "es"
          ? "No nos damos cuenta de que el 90% de nuestro día se basa en hábitos; casi todo lo que hacemos es algo que hemos estado haciendo continuamente todos los días. Cepillarnos los dientes, conducir, deslizar nuestros teléfonos, etc., todo es automático; no ponemos ningún esfuerzo sin importar cuán fácil o difícil sea la tarea, eventualmente entramos en el ritmo."
          : language === "de"
          ? "Wir realisieren nicht, dass 90% unseres Tages auf Gewohnheiten basieren; fast alles, was wir tun, ist etwas, das wir jeden Tag kontinuierlich getan haben. Zähneputzen, Autofahren, auf unseren Telefonen scrollen usw. - alles ist automatisch; wir stecken keine Anstrengung hinein, egal wie einfach oder schwer die Aufgabe ist, schließlich kommen wir in den Rhythmus."
          : language === "fr"
          ? "Nous ne réalisons pas que 90% de notre journée est basé sur des habitudes; presque tout ce que nous faisons est quelque chose que nous faisons continuellement chaque jour. Se brosser les dents, conduire, faire défiler nos téléphones, etc. - tout est automatique; nous ne mettons aucun effort, peu importe la facilité ou la difficulté de la tâche, finalement nous entrons dans le rythme."
          : "Non ci rendiamo conto che il 90% della nostra giornata si basa su abitudini; praticamente tutto ciò che facciamo è qualcosa che facciamo continuamente ogni giorno. Lavare i denti, guidare, sfogliare i nostri telefoni, eccetera: è tutto automatico; non mettiamo alcuno sforzo, indipendentemente da quanto sia facile o difficile il compito, alla fine entriamo nel ritmo."}
      </Typography>
    </Box>
  )
}

export default Home
