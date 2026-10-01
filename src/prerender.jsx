import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom/server';
import App from './App.jsx';
export const render=path=>renderToString(<StaticRouter location={path}><App/></StaticRouter>);

export {metadata,headHtml,publicRoutes,privateRoutes,ORIGIN} from './lib/seo.js';
import {DATA} from './data.js';
import {validateContent} from './lib/content.js';
export function validate(){const errors=validateContent(DATA);if(errors.length)throw new Error(errors.join('\n'));}
