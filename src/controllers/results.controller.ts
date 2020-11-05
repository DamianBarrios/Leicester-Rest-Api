import {Request, Response} from 'express';
import Results, { IResults } from '../models/results';

export const lastMatch = async (req:Request, res:Response) => {
    //Getting Last Match
    const lastMatched = await Results.find().limit(1);
    if(!lastMatched) return res.status(400).json('Match not found');
    res.json(lastMatched);
}
export const searchMatch = async (req:Request, res:Response) => {
    //Search match by date or id
    const matchSearchByDate = await Results.findOne({date: req.body.date});
    const matchSearchById = await Results.findOne({id: req.body.id});
    if (matchSearchByDate){
        res.json(matchSearchByDate)
    }else if(matchSearchById){
        res.json(matchSearchById);
    }else {
        return res.status(400).json('Match not found');
    }
    
    
}
export const searchByInterval = async (req:Request, res:Response) => {
    //Search in interval
    const matchSearched = await Results.find({date:{"$gte": req.body.start , "$lte": req.body.end}})
    if(matchSearched.length == 0) return res.status(400).json('Matchs not found');
    res.json(matchSearched);
}
export const pointsMatch = async (req:Request, res:Response) => {
    //Points of matchs
    const matchSearched = await Results.find({date:{"$gte": req.body.start , "$lte": req.body.end}})
    let points=0;
    matchSearched.forEach((match)=>{
        console.log(match.result)
        if(match.result == "W"){
            points += 3;
        }else if(match.result == "D"){
            points += 1;
        }else{
            points += 0;
        }
    })
    if(matchSearched.length == 0) return res.status(400).json('Matchs not found');
    res.json(`The Foxes get ${points} points between ${req.body.start} to ${req.body.end}`);

}
export const mostGoal = async (req:Request, res:Response) => {
    //Get team that scored the most goals
    const matchSearched = await Results.find()
    let mostGoals = 0;
    let team;
    let competition;
    matchSearched.forEach((match) => {
        if(match.result == "L"){
            if(parseInt(match.score.toLocaleString().charAt(0)) > mostGoals){
                team = match.oponent;
                competition = match.competition;
                mostGoals = parseInt(match.score.toLocaleString().charAt(0))
            }else if(parseInt(match.score.toLocaleString().charAt(2)) > mostGoals){
                team = match.oponent;
                competition = match.competition;
                mostGoals = parseInt(match.score.toLocaleString().charAt(2))
            }
        }
        
    })
    res.json(`The team that scored the most goals against The Foxes is ${team} with ${mostGoals} goals in the ${competition}`);
}
export const addMatch = async (req:Request, res:Response) => {
    //Add match
    const match:IResults = new Results({
        id: req.body.id,
        competition: req.body.competition,
        date: req.body.date,
        oponent: req.body.oponent,
        result: req.body.result,
        score: req.body.score
    })

    
    let aux = false;
    const matchs = await Results.find();
    matchs.some((matchSearch) => {
        if(req.body.id == matchSearch.id || req.body.date == matchSearch.date){
            aux = true;
            return res.json('Already exist an id or a date like this');
        }
        
    })
    if(!aux){
        await match.save()
        res.json('¡Match saved!')
    }
    
}

