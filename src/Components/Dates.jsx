import { TbEdit } from "react-icons/tb"

function Date({ dateInfo }) {
    const { date, description, done, id, pics_urls, title } = dateInfo
    return <article className="date_card">
        <h2>{title}</h2>
        <div className="date_info">
            <p>{description}</p>
            {date !== "0001-01-01" && <p>planned for: {date}</p>}
            {done && <p>We did it!!</p>}
            {pics_urls.length !== 0 && <div>
                <h3>pics ^^:</h3>
                <div className="images_container">
                    {pics_urls.map((pic_url, id) =>
                        <img key={pic_url + id} src={pic_url} />
                    )}
                </div>
            </div>}
            <button className="rounded_button pink_button">
                edit uu
                {<TbEdit size={"95%"} color="var(--claret)" style={{ width: "50px" }} />}
            </button>
        </div>
    </article>
}

export function Dates({ datesList }) {
    return <section className="dates_container">
        {datesList.map(date => <Date key={date.id} dateInfo={date} />)}
    </section>
}