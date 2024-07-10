import { useState, useEffect, useRef } from "react"

function PicsUrlsInputFields({ urlsList, setUrlsList }) {

    function updateUrl(url, id) {
        setUrlsList([...urlsList.slice(0, id), url, ...urlsList.slice(id + 1)])
    }

    function addNewUrl() {
        setUrlsList([...urlsList, ""])
    }

    return <>
        {urlsList.map((url, id) =>
            <input type="text" key={id} defaultValue={url}
                onChange={(e) => { updateUrl(e.target.value, id) }} 
                placeholder={id == 0 ? "any image url here ^^" : "more images :D"}
            />
        )}
        <button type="button" onClick={addNewUrl} className="rounded_button white_button"> + </button>
    </>
}

export function DateForm({ prevData, switchDateFormVisibility, uploadDate }) {

    const [urlsList, setUrlsList] = useState(prevData ? prevData.urls_list : [""])
    const formRef = useRef()
    const titleRef = useRef()
    const descriptionRef = useRef()
    const dateRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            formRef.current.style.maxHeight = "3000px"
        }, 1)
    }, [])

    function setUpload(){
        if (titleRef.current.value.trim() === "") {
            alert("please type something in the mandatory fields :(((")
        }else {
            uploadDate({
                title: titleRef.current.value,
                ...(descriptionRef.current.value && { description: descriptionRef.current.value }),
                ...(dateRef.current.value && { date: dateRef.current.value }),
                pics_urls: urlsList.filter(url => url !== "")
            })
        }
    }

    function cancelDateCreation() {
        formRef.current.style.transition = "all 0s"
        formRef.current.style.maxHeight = formRef.current.offsetHeight + "px"
        formRef.current.style.transition = "all 1.5s ease-out"
        formRef.current.style.maxHeight = "0px"
        setTimeout(() => { switchDateFormVisibility() }, 1500)
    }
    return <form ref={formRef} className="date_card date_form" style={!prevData && { maxHeight: "0px" }}>

        <h2>creating a new date :0...</h2>

        <div className="date_info">
            <p>fields marked with * are mandatory -.-</p>

            <span>
                * Title:
                <input placeholder="give our date a name ^^" name="title" ref={titleRef}/>
            </span>
            <span>
                Description:
                <textarea placeholder="all the details about the date should be here ^^" name="description" ref={descriptionRef}/>
            </span>
            <span>
                Date:
                <input type="date" name="date" ref={dateRef}/>
            </span>
            <span>
                Pics urls:
                <p>press the + button to add more fields for more pics ^^</p>
                <PicsUrlsInputFields urlsList={urlsList} setUrlsList={setUrlsList} />
            </span>
            <button type="button" onClick={setUpload} className="rounded_button blue_button">Upload this date :3</button>
            <button type="button" onClick={cancelDateCreation} className="rounded_button claret_button">Cancel date creation :(</button>
        </div>
    </form>
}
