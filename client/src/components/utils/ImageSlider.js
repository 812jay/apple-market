import { Carousel } from 'antd'
import React from 'react'

function ImageSlider(props) {
    console.log(props)
    return (
        <div>
            <Carousel>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150px' }} 
                            src={`http://localhost:5000/${image}`}
                            alt={index}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider