import s from "./Home.module.css";
import notehub from "../assets/notehub.png";

export default function Home() {
  return (
    <div className={s.home}>
      <div className={s.connexion}>
        <div className={s.connexionbox}>Créer un compte</div>
        <div className={s.connexionbox}>Se connecter</div>
      </div>
      <div className={s.img}>
        <img src={notehub} alt="logo" className={s.notehub} />
        <h2>L'application qui vous facilite la vie</h2>
      </div>
    </div>
  );
}
