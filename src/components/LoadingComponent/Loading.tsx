import "./Loading.css";
import {t} from "i18next"

const Loading = () => {
  return <div className="loader-text">{t("loading...")}</div>;
};

export default Loading;
