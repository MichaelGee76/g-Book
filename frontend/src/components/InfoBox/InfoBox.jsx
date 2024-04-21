const InfoBox = ({ isVisible, message }) => {
    return <div className={`infoBox ${isVisible ? "visible" : "hidden"}`}>{message}</div>;
};
export default InfoBox;
