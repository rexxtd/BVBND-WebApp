import "./ranking.css";

export default function Ranking({ allDoctors }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const sorted = (data) => {
        const sorted = data.sort((doc1, doc2) => doc2.rating - doc1.rating);
        let cnt = 0;
        const ret = [];
        while (cnt < 10 && cnt < sorted.length) ret.push(sorted[cnt++]);
        return ret;
    };
    const sortedDoctor = sorted(allDoctors);
    let position = 1;

    return (
        <>
            {/* <div className="ranking"> */}
                {sortedDoctor.length ? (
                    <div className="rankChart">
                        {sortedDoctor.map((doc) => (
                            <div className="rankRow">
                                <span className="rankPosition">{position++}</span>
                                <img
                                    src={
                                        doc?.profilePicture
                                            ? doc.profilePicture
                                            : PF + "/person/noAvatar.png"
                                    }
                                    alt=""
                                    className="rankAvatar"
                                />
                                <span className="rankName">{doc.username}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    "No Doctors"
                )}
                
            {/* </div> */}
        </>
    );
}
