import React, { useState } from 'react';
import { Radio, Collapse } from 'antd';

const { Panel } = Collapse;

function RadioBox(props) {

    const [Value, setValue] = useState(0);

    const renderRadioProps = () => (
        props.list && props.list.map(value => (
            <Radio key={value._id} value={value._id}>{value.name}</Radio>
        ))
    );

    const handleChange = (event) => {
        setValue(event.target.value);
        props.handleFilters(event.target.value);
    }
    
    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header='가격' key='1'>
                    <Radio.Group onChange={handleChange} value={Value}>
                        {renderRadioProps()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox;
