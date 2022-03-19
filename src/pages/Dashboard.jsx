import React, { useEffect, useState } from 'react'
import EvaluationModels from '../services/EvaluationModels';

export default function Dashboard() {

    const [evaluationModels, setEvaluationModels] = useState([])

    useEffect(()=>{
        let evaluationModels  = new EvaluationModels();
        evaluationModels.getEvaluationModels().then(result => setEvaluationModels(result.data.data))
    })

  return (
    <div>Dashboard</div>
  )
}