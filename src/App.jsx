import { useState, useEffect, useRef } from "react"
import { datesEndPoint } from "./consts"
import { Dates } from "./Components/Dates"
import { DateForm } from "./Components/DateForm"
import { UploadScreen } from "./Components/UploadScreen"
import "./styles.css"

export function App() {

    const [datesList, setDatesList] = useState([])
    const [error, setError] = useState()
    const [isDateFormVisible, setDateFormVisibility] = useState(false)
    const [uploadStatus, setUploadStatus] = useState(null)

    function fetchApiData() {
        fetch(datesEndPoint)
            .then(res => res.json())
            .then(data => { setDatesList(data.sort((a, b) => a.id > b.id ? 1 : -1)) })
            .catch(error => { setError(error) })
    }
    useEffect(() => {
        fetchApiData()
    }, [])

    function switchDateFormVisibility() {
        setDateFormVisibility(!isDateFormVisible)
    }

    function uploadDate(dateInfo){
        setUploadStatus("uploading")
        fetch(datesEndPoint, {
            method: "POST",
            body: JSON.stringify(dateInfo),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => setUploadStatus(res.ok ? "uploaded" : "error"))
    }

    return <main>
        {uploadStatus && <UploadScreen uploadStatus={uploadStatus}/>}
        <h1>Dates planner</h1>
        {isDateFormVisible
            ? <DateForm switchDateFormVisibility={switchDateFormVisibility} uploadDate={uploadDate} />
            : <button className="rounded_button large_button pink_button" onClick={switchDateFormVisibility}>
                Create new date :D
                {/* {<FaPlus size={"95%"} color="var(--claret)" style={{ width: "50px" }} />} */}
            </button>}
        {error && <p>Sorry, an error has ocurred :(</p>}
        <Dates datesList={datesList} />
    </main>
}
