import {
  MAX_ROOM_GUESTS,
  MIN_ROOM_ADULTS,
  MIN_ROOM_CHILDREN,
} from '../constants/RoomAllocation';
import { Room } from '../components/RoomAllocation';

const defaultRoom: Room = {
  adult: MIN_ROOM_ADULTS,
  child: MIN_ROOM_CHILDREN,
};

export function validateRoomPeople(roomPeople: number): boolean {
  return roomPeople <= MAX_ROOM_GUESTS;
}

export function isRoomEnough(guest: number, room: number): boolean {
  return guest <= room * MAX_ROOM_GUESTS;
}

export function generateRooms(guest: number, room: number) {
  const roomNumber = isRoomEnough(guest, room)
    ? room
    : Math.ceil(guest / MAX_ROOM_GUESTS);
  const rooms = [];
  for (let i = 0; i < roomNumber; i += 1) {
    rooms.push(defaultRoom);
  }

  return rooms;
}

export function calculateRemainPeople(guest: number, rooms: Room[]): number {
  const totalRemainPeople = rooms.reduce(function (acc, { adult, child }) {
    return acc - adult - child;
  }, guest);

  return totalRemainPeople;
}
