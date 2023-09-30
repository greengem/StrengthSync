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
                    <div className="grid grid-cols-3">
                        <div>1h 2m</div>
                        <div>5000 kg</div>
                        <div>8 PRs</div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Exercise</th>
                                    <th>Best Set</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Bench Press</td>
                                    <td>100kg x 3</td>
                                </tr>
                                <tr>
                                    <td>Deadlift</td>
                                    <td>200kg x 1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}
