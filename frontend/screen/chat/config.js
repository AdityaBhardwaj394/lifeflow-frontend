import { Platform } from "react-native";

import { io } from 'socket.io-client';
export const BaseUrl=Platform.OS==='android'?'http://192.168.163.190:4000/':'http://localhot:4000';
export const socket=io.connect('http://192.168.163.190:3005/')
