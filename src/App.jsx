import { useState, useEffect } from "react"
import { datesEndPoint } from "./consts"
import { TbEdit } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import "./styles.css"

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
            <button className="pink_button">{<TbEdit size={"100%"} color="var(--claret)"/>}</button>
        </div>
    </article>
}

function Dates({ datesList }) {
    return <section className="dates_container">
        {datesList.map(date => <Date key={date.id} dateInfo={date} />)}
    </section>
}

export function App() {

    const [datesList, setDatesList] = useState([])
    const [error, setError] = useState()

    function fetchApiData() {
        fetch(datesEndPoint)
            .then(res => res.json())
            .then(data => { setDatesList(data.sort((a, b) => a.id > b.id ? 1 : -1)) })
            .catch(error => { setError(error) })
    }
    useEffect(() => {
        fetchApiData()
    }, [])

    return <main>
        <h1>Dates planner</h1>
        <button className="pink_button large_button">
            Add new date {<FaPlus size={"95%"} color="var(--claret)" style={{width: "50px"}}/>}
            </button>
        {error && <p>Sorry, an error has ocurred :(</p>}
        <Dates datesList={datesList} />

    </main>
}