/**
 *
 * Asynchronously loads the component for TeamPage
 *
 */

import React from 'utils/loadable';
import loadable from 'utils/loadable';
import Loading from 'components/Loading';

export default loadable(() => import('./index'), { fallback: <Loading /> });
