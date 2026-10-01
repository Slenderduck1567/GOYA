import { SmartImage } from "../components/SmartImage.jsx";
import React from 'react';
import {DATA} from '../data.js';
import {Footer} from '../Chrome.jsx';
import {PageIntro} from '../shared.jsx';
export default function Stories(){return <><PageIntro eyebrow="The GOYA journal" title="People. Places. Parea.">Small moments from a community with a lot of heart.</PageIntro><section className="container section story-list">{DATA.stories.map(story=><article key={story.id} id={story.id} className={`story-article ${story.image?'':'story-type'}`}>{story.image&&<SmartImage src={story.image} alt="GOYA members together on the verandah" loading="lazy"/>}<div><span className="eyebrow">{story.eyebrow}</span><h2>{story.title}</h2><p className="lead">{story.summary}</p><p>{story.body}</p><a className="text-link" href={story.url} target="_blank" rel="noopener noreferrer">Read the original community post ↗</a></div></article>)}</section><Footer/></>}
