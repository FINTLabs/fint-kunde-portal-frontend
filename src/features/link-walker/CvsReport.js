import * as XLSX from 'xlsx';

class CvsReport {

    static getReport(test) {


        const relations = test.relations;
        let report = [];
        Object.entries(relations).forEach(([k, v]) => {
            let row;
            v.forEach(test => {
                if (test !== undefined) {
                    row = {
                        RELATION: k,
                        STATUS: test.status,
                        REASON: test.reason,
                        URL: {
                            v: test.url.replace('felleskomponent.no/', 'felleskomponent.no/?/'),
                            l: {
                                Target: test.url.replace('felleskomponent.no/', 'felleskomponent.no/?/'),
                                Tooltip: "Klikk for å gå til test klienten"
                            }
                        },
                    };
                    report.push(row);
                }
            });

        });

        return report;
    }

    static getExcelReport(test) {
        let wb = XLSX.utils.book_new();


        let ws = XLSX.utils.json_to_sheet(CvsReport.getReport(test));
        ws['!autofilter'] = {
            ref: "A1:D1"
        };
        ws['!cols'] = [{
            wch: 25
        }, {
            wch: 10
        }, {
            wch: 25
        }, {
            wch: 100
        }];
        //ws['!rows'] = [{hpx: 20}];

        XLSX.utils.book_append_sheet(wb, ws, "Test rapport");


        const wbout = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'binary'
        });

        let buf = new ArrayBuffer(wbout.length); //convert s to arrayBuffer
        let view = new Uint8Array(buf); //create uint8array as viewer
        for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xFF; //convert to octet
        return buf;


    }
}

export default CvsReport;