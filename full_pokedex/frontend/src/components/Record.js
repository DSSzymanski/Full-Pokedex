import React from 'react';
import shiny_icon from '../icon_images/shiny_icon.png';
import ic_mega from '../icon_images/ic_mega.png';
import ic_shadow from '../icon_images/ic_shadow.png';
import ic_purified from '../icon_images/ic_purified.png';
import ui_bg_lucky_pokemon from '../icon_images/ui_bg_lucky_pokemon.png';
import RecordButton from './RecordButton';

const Record = (props) => {
  return (
    <div className="recordDiv">
        { !props.pokemon.has_shiny ? null :
            <RecordButton
                active={props.data['shiny']}
                title="Shiny"
                updateFn={() => props.setData(prev => ({
                    ...props.data,
                    shiny: !props.data.shiny,
                }))}
                icon={shiny_icon}
            />
        }
        <RecordButton
            active={props.data['lucky']}
            title="Lucky"
            updateFn={() => props.setData(prev => ({
                ...props.data,
                lucky: !props.data.lucky,
            }))}
            icon={ui_bg_lucky_pokemon}
        />
        { !props.pokemon.has_shadow ? null :
            <>
                <RecordButton
                    active={props.data['shadow']}
                    title="Shadow"
                    updateFn={() => props.setData(prev => ({
                        ...props.data,
                        shadow: !props.data.shadow,
                    }))}
                    icon={ic_shadow}
                />
                <RecordButton
                    active={props.data['purified']}
                    title="Purified"
                    updateFn={() => props.setData(prev => ({
                        ...props.data,
                        purified: !props.data.purified,
                    }))}
                    icon={ic_purified}
                />
            </>
        }
        { !props.pokemon.has_mega ? null :
            <RecordButton
                active={props.data['mega']}
                title="Mega"
                updateFn={() => props.setData(prev => ({
                    ...props.data,
                    mega: !props.data.mega,
                }))}
                icon={ic_mega}
            />
        }
    </div>
  )
}

export default Record;