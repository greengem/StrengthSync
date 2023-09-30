'use client'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
export default function HistoryCard() {
    return (
        <>
            <p className="mb-3 uppercase text-xs text-gray-500">September 2023</p>
            <Card className="mb-5">
                <CardBody>
                    <p className="font-semibold mb-0">Workout group name</p>
                    <p>Monday, 4 Sep</p>
                    <div className="grid grid-cols-3 mb-5">
                        <div>1h 2m</div>
                        <div>5000 kg</div>
                        <div>8 PRs</div>
                    </div>
                    <Table removeWrapper aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>EXERCISE</TableColumn>
                            <TableColumn>BEST SET</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                            <TableCell>Bench Press</TableCell>
                            <TableCell>3 x 100kg</TableCell>
                            </TableRow>
                            <TableRow key="2">
                            <TableCell>Deadlift</TableCell>
                            <TableCell>3 x 200kg</TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>

                </CardBody>
            </Card>
        </>
    )
}
