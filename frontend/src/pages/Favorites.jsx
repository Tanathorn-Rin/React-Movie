import "../css/Favorites.css"

function Favorites() {
    return (
        <div className="favorites">
            <div className="favorites-empty">
                <h2>No favorite movies added yet.</h2>
                <p>Start adding some!</p>
            </div>
        </div>
    );
}

export default Favorites;