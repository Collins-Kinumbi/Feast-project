import useFetchUsername from "../../Hooks/Fetch Username/useFetchUsername";

function UsernameCard({ userId }) {
  const { username } = useFetchUsername(userId);
  return (
    <p className="user">
      By <span>{username || "Unknown"}</span>
    </p>
  );
}

export default UsernameCard;
