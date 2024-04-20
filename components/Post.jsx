export default function Post({ id, fullName, role }) {
    return (
        <div className="bg-black-500 w-28 h-28">
            <h1>HUY</h1>
            <h1>{fullName}</h1>
            <p>{role}</p>
        </div>
    );
}
