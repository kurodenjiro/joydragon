"use client"
import React, { useState, useEffect ,useMemo } from 'react';

import {Table, TableHeader, TableColumn,Link, TableBody, TableRow, TableCell,Button ,Input , Spinner , Pagination} from "@nextui-org/react";



const fetcher = async (...args: Parameters<typeof fetch>) => {
	const res = await fetch(...args);
	return res.json();
  };


export default function ActivityPage() {
	const [page, setPage] = React.useState(0);





const renderCell = React.useCallback(async(element:any, columnKey:any ) => {

	const cellValue = element[columnKey];
	let item : any= {};

	
	console.log("status",data.method)
	switch (columnKey) {
	  case "pet":
		return (
			<div className="relative flex justify-start items-center gap-2">
			{item.pet}
		  </div>
		);
	  case "action":
		return (
			<div className="relative flex justify-end items-center gap-2">
			<p className="text-bold text-sm capitalize">{item.action}</p>
		  </div>
		);
	  case "info":
		return (
		  <div className="relative flex justify-end items-center gap-2">
			<p className="text-bold text-sm capitalize">{item.log}</p>
			
		  </div>
		);
	  default:
		return cellValue;
	}
  }, []);

	return (
		<>
		<div className='pt-1'>
		<Table 
		 selectionMode="single"
		 classNames={{
			base: "max-h-[520px] pt-3",
			table: "min-h-[420px] pt-3",
		  }}
			bottomContent={
				pages > 0 ? (
				  <div className="flex w-full justify-center">
					<Pagination
					  isCompact
					  showControls
					  showShadow
					  color="primary"
					  page={page}
					  total={pages}
					  onChange={(page) => setPage(page)}
					/>
				  </div>
				) : null}
		
		>
      <TableHeader>
        <TableColumn key={"pet"}>Pet.</TableColumn>
        <TableColumn key={"action"}>Action</TableColumn>
        <TableColumn key={"info"}>Info</TableColumn>
      </TableHeader>
      <TableBody
	  	  items={data?.data || []}
			loadingState={loadingState}
			loadingContent={<Spinner label="Loading..." />}
	  
	  >
	  
	  {(item:any)  =>  (
          <TableRow key={item?.blockHash}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
		</div>
		</>
	);
}
