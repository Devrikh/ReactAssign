import { useEffect, useRef, useState } from "react";
import "./App.css";
import { type Artwork, type Api } from "./interfaces/artwork";
import axios from "axios";

import { OverlayPanel } from "primereact/overlaypanel";
import { DataTable, type DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

function App() {
  const [page, setPage] = useState<number>(0);
  const [rows, setRows] = useState<Artwork[]>([]);
  const [totalArtwork, setTotalArtwork] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [remainingSelection, setRemainingSelection] = useState<number>(0);

  const overlayRef = useRef<OverlayPanel>(null);
  const [selectCount, setSelectCount] = useState<number>(0);
  const [selectionStartPage, setSelectionStartPage] = useState<number | null>(
    null
  );

  const selectedRows = rows.filter((row) => selectedIds.has(row.id));

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const res = await axios.get<Api>(
          "https://api.artic.edu/api/v1/artworks",
          { params: { page: page + 1 } }
        );
        setRows(res.data.data);
        setTotalArtwork(res.data.pagination.total);

        if (
          remainingSelection > 0 &&
          selectionStartPage !== null &&
          page === selectionStartPage + 1
        ) {
          const newSet = new Set(selectedIds);
          let remaining = remainingSelection;

          for (const row of res.data.data) {
            if (remaining <= 0) break;
            if (!newSet.has(row.id)) {
              newSet.add(row.id);
              remaining--;
            }
          }

          setSelectedIds(newSet);
          setRemainingSelection(remaining);
          setSelectionStartPage(page);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [page]);

  const onPageChange = (e: DataTablePageEvent) => {
    setPage(e.page!);
  };

  const selectionChange = (e: { value: Artwork[] }) => {
    const newSet = new Set(selectedIds);
    rows.forEach((row) => newSet.delete(row.id));
    e.value.forEach((row) => newSet.add(row.id));
    setSelectedIds(newSet);
  };

  const overlaySelection = () => {
    if (selectCount <= 0) {
      alert("Please enter a valid number");
      return;
    }

    const newSet = new Set<number>();
    let remaining = selectCount;

    for (const row of rows) {
      if (remaining <= 0) break;
      newSet.add(row.id);
      remaining--;
    }

    setRemainingSelection(remaining);
    setSelectedIds(newSet);
    setSelectionStartPage(page);
    overlayRef.current?.hide();
    setSelectCount(0);
  };

  function inscriptionBody(row: Artwork) {
    return row.inscriptions ? row.inscriptions : "-";
  }

  return (
    <div className="w-full h-screen text-white bg-slate-200 flex justify-center items-center">
      <div className="my-4 mx-20 p-2 text-black bg-white rounded-2xl gap-6">
        <div className="flex gap-2 items-center mb-2">
          <Button
            label="Custom Select Rows"
            className="p-button-rounded p-button-info custom-btn"
            onClick={(e) => overlayRef.current?.toggle(e)}
          />
          <p className="text-black font-semibold flex gap-1">
            Selected:{" "}
            <span className="text-blue-300">
              {selectedIds.size + remainingSelection}
            </span>
          </p>

          <OverlayPanel ref={overlayRef} dismissable>
            <div className="flex flex-col gap-2 p-2">
              <label>Number of rows to select:</label>
              <InputNumber
                value={selectCount}
                onValueChange={(e) => setSelectCount(e.value ?? 0)}
                min={1}
                max={totalArtwork}
              />
              <Button
                label="Select"
                className="p-button-rounded p-button-success mt-2"
                onClick={overlaySelection}
              />
            </div>
          </OverlayPanel>
        </div>

        <DataTable<any>
          value={rows}
          first={page * 12}
          lazy
          paginator
          rows={12}
          totalRecords={totalArtwork}
          loading={loading}
          onPage={onPageChange}
          dataKey="id"
          stripedRows
          tableStyle={{ minWidth: "50rem" }}
          scrollable
          scrollHeight="70vh"
          className="artwork-table"
          selection={selectedRows}
          onSelectionChange={selectionChange}
          paginatorTemplate="PrevPageLink PageLinks NextPageLink CurrentPageReport"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
          <Column field="title" header="Title" />
          <Column field="place_of_origin" header="Origin" />
          <Column field="artist_display" header="Artist" />
          <Column
            field="inscriptions"
            header="Inscriptions"
            body={inscriptionBody}
          />
          <Column field="date_start" header="Start Year" />
          <Column field="date_end" header="End Year" />
        </DataTable>
      </div>
    </div>
  );
}

export default App;
