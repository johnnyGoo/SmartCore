import _ from 'underscore'
import Animations from './Animations'
import Css from './Css'
import Event from './Event'
import Utils from './Utils'
import EventDispatcher from './EventDispatcher'
import PxLoader from './PxLoader'
import Device from './Device'
import Sound from './Sound'
import Tween from './Tween'
import Url from './Url'
import Video from './Video'
var Smart={};
Smart._=_;
Smart.Animations=Animations;
Smart.Css=Css;
Smart.Event=Event;
Smart.Utils=Utils;
Smart.EventDispatcher=EventDispatcher;
Smart.Loader=PxLoader;
Smart.Device=Device;
Smart.Sound=Sound;
Smart.Tween=Tween;
Smart.Url=Url;
Smart.Video=Video;
export default Smart;