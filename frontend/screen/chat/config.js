import { Platform } from "react-native";

<<<<<<< HEAD
import { io } from 'socket.io-client';
export const BaseUrl=Platform.OS==='android'?'http://192.168.163.190:4000/':'http://localhot:4000';
export const socket=io.connect('http://192.168.163.190:4000/')
=======
import {io} from 'socket.io-client';
export const BaseUrl=Platform.OS==='android'?'http://192.168.163.190:4000/':'http://localhot:4000';
export const socket=io.connect('http://192.168.163.190:3005/')
>>>>>>> dc65873552dc326f265fb78f36f864f84080bc36
