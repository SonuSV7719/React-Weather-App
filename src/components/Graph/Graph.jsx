import React, { useEffect, useState } from 'react'
import { CChart } from '@coreui/react-chartjs'
import './graph.css'

function Graph(props) {
    const [forcast, setForcast] = useState(null);
    useEffect(() => {
        const apiCall = async () => {
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${props.src}&&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
            const response = await fetch(url);
            const resToJson = await response.json();
            console.log("list forcast");
            console.log(resToJson.list)
            setForcast(resToJson.list);
        };
        apiCall();
    }, [props.src])

    return (

        <div className="graph">
            <h3>Weather Forcast {props.src}</h3>
            {!forcast ? (<p><b>City not found</b></p>) : (
                <CChart width="800px"
                    height="500px"
                    maintainAspectRatio="false"
                    type="line"
                    data={{
                        labels: [forcast[0].dt_txt, forcast[1].dt_txt, forcast[9].dt_txt, forcast[17].dt_txt, forcast[25].dt_txt, forcast[33].dt_txt],
                        datasets: [
                            {
                                label: `5 Days Weather Forcast ${props.src}`,
                                backgroundColor: "rgba(253,183,0,255)",
                                borderColor: "rgba(253,183,0,255)",
                                pointBackgroundColor: "rgba(253,183,0,255)",
                                pointBorderColor: "#fff",
                                data: [forcast[0].main.temp, forcast[1].main.temp, forcast[9].main.temp, forcast[17].main.temp, forcast[25].main.temp, forcast[33].main.temp]
                            },
                        ],

                    }}
                    options={
                        {
                            scales: {
                                y: {
                                    title: {
                                        display: true,
                                        text: "Temperature"
                                    }

                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: "Dates and time"
                                    }

                                }

                            }
                        }
                    }
                />)}
        </div>
    )
}

export default Graph