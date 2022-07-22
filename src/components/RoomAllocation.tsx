import { useState } from 'react';
import CustomInputNumber from './CustomInputNumber';
import {
  MAX_ROOM_GUESTS,
  MIN_ROOM_ADULTS,
  MIN_ROOM_CHILDREN,
  STEPPER_STEP,
} from '../constants/RoomAllocation';
import {
  generateRooms,
  calculateRemainPeople,
  validateRoomPeople,
} from '../utils/RoomAllocation';

export type Room = {
  adult: number;
  child: number;
};
type RoomAllocationResult = Room[];
type RoomAllocationProps = {
  guest: number;
  room: number;
  onChange: (result: RoomAllocationResult) => void;
};

function RoomAllocation({ guest, room, onChange }: RoomAllocationProps) {
  const [roomsResult, setRoomsResult] = useState(generateRooms(guest, room));
  const [totalRemainPeople, setTotalRemainPeople] = useState(
    calculateRemainPeople(guest, roomsResult)
  );
  const handleRoomChange =
    (changedRoomIdx: number) =>
    ({ name, value }: any) => {
      const newRoomsResult = roomsResult.map((room, currentIdx) => {
        const { adult: currentAdult, child: currentChild } = room;
        const newAdult = name == 'adult' ? value : currentAdult;
        const newChild = name == 'child' ? value : currentChild;
        const newRoomPeople = newAdult + newChild;
        if (
          changedRoomIdx !== currentIdx ||
          !validateRoomPeople(newRoomPeople)
        ) {
          return room;
        }
        const newRoomResult = {
          ...room,
          [name]: value,
        };
        return newRoomResult;
      });
      setRoomsResult(newRoomsResult);
      setTotalRemainPeople(calculateRemainPeople(guest, newRoomsResult));
      onChange(newRoomsResult);
    };

  return (
    <div className="border border-dashed w-[24rem] px-3">
      <div className="text-xl font-bold">
        住客人數：{guest} 人／{room} 房
      </div>
      <div className="border border-primary bg-secondary h-16 my-4 pl-4 flex items-center">
        <div>尚未分配人數：{totalRemainPeople} 人</div>
      </div>
      {roomsResult.map(({ adult, child }, idx) => (
        <div key={`room-${idx}`}>
          <div className="text-xl font-bold my-4">房間：{adult + child} 人</div>
          <div className="flex justify-between mb-4">
            <div className="text-sm">
              <div className="font-semibold">大人</div>
              <div className="">年齡 20+</div>
            </div>
            <CustomInputNumber
              disabled={false}
              max={MAX_ROOM_GUESTS}
              min={MIN_ROOM_ADULTS}
              minusDisabled={false}
              name={'adult'}
              plusDisabled={
                totalRemainPeople === 0 || adult + child >= MAX_ROOM_GUESTS
              }
              step={STEPPER_STEP}
              tabIndex={0}
              value={adult}
              onChange={handleRoomChange(idx)}
              onBlur={(event) => console.log(event)}
            />
          </div>
          <div className="flex justify-between pb-4 mb-4 border-b">
            <div className="text-sm">
              <div className="font-semibold">小孩</div>
            </div>
            <CustomInputNumber
              disabled={false}
              max={MAX_ROOM_GUESTS - MIN_ROOM_ADULTS}
              min={MIN_ROOM_CHILDREN}
              minusDisabled={false}
              name={'child'}
              plusDisabled={
                totalRemainPeople === 0 || adult + child >= MAX_ROOM_GUESTS
              }
              step={STEPPER_STEP}
              tabIndex={0}
              value={child}
              onChange={handleRoomChange(idx)}
              onBlur={(event) => console.log(event)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoomAllocation;
