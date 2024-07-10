export function UploadScreen({uploadStatus}) {
    const body = document.getElementsByTagName("body")[0]
    body.style.height = "100%"
    body.style.overflow = "hidden"

    return <div className="screen_shadow">
        <section className="modal">
            { uploadStatus === "uploading" 
                ? <>
                    <p>uploading this date {">"}:3</p>
                    <p>please wait a second!!!</p>
                </>
                : uploadStatus === "uploaded"
                ? <>
                    <p>WE ARE GOING ON A DATE :D!</p>
                    <p>the date was successfully uploaded ^^</p>
                    <p>press the YIPEEE button to reload de page</p>
                    <button className="rounded_button claret_button" onClick={()=>location.reload()}>YIPEEEEE</button>
                </>
                : <>
                    <p>damn :(( it looks like something went wrong</p>
                    <p>please try agaiiiin uu</p>
                    <button className="rounded_button claret_button" onClick={()=>location.reload()}>try again T-T</button>
                </>

            }
        </section>
    </div>
}