export default function MajorButtons({ magicBtnAction, sendBtnAction }) {
  return (
    <div className="major-btn-div">
      <button className="major-btn" onClick={magicBtnAction}>
        Magic Fill
      </button>
      <button className="major-btn" onClick={sendBtnAction}>
        Send
      </button>
    </div>
  );
}
