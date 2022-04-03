import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom';
import ScrollButton from '../../../components/ScrollButton/ScrollButton';
import { AppStateType } from '../../../redux/reducers/root-reducer'
import { fetchPerfumes } from '../../../redux/thunks/perfume-thunks';
import { Perfume } from '../../../types/types'
import PerfumeListComponent from './PerfumeListComponent';

function PerfumeList() {
    const dispatch = useDispatch();
    const perfumes: Array<Perfume> = useSelector((state: AppStateType) => state.perfume.perfumes);

    useEffect(() => {
        dispatch(fetchPerfumes());
    }, [])
    
    const itemsPerPage = 24;
    const searchByData = [
        {label: 'Brand', value: 'perfumer'},
        {label: 'Perfume title', value: 'perfumeTitle'},
        {label: 'Manufacturer country', value: 'country'},
        {label: 'Gender', value: 'perfumeGender'}
    ]
    return (
        <div className="container-fluid">
            <ScrollButton />
            <Route exact component={() => 
                <PerfumeListComponent
                    data={perfumes}
                    itemsPerPage={itemsPerPage}
                    searchByData={searchByData} />} />
        </div>
    )
}

export default PerfumeList