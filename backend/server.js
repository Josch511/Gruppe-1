import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import { albums } from './datafile.json';

const server = express();

server.use(express.static("frontend"));
server.use(express.json());
server.use(onEachRequest);
server.get("/api/datafile.json", onGetTracks)