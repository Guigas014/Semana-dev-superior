package com.devsuperior.dsmovie.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsmovie.dto.ScoreDTO;
import com.devsuperior.dsmovie.repositories.MovieRepository;
import com.devsuperior.dsmovie.repositories.ScoreRepository;
import com.devsuperior.dsmovie.repositories.UserRepository;

import com.devsuperior.dsmovie.entities.User;
import com.devsuperior.dsmovie.entities.Movie;
import com.devsuperior.dsmovie.entities.Score;


@Service
public class ScoreService {
  
  @Autowired
  private MovieRepository movieRepository;

  
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ScoreRepository scoreRepository;


  @Transactional
  public void saveScore(ScoreDTO dto) {

    //Busca o usuárioi pelo email do DTO e salva um novo se não existir.
    User user = userRepository.findByEmail(dto.getEmail());
    if (user == null) {
      user = new User();
      user.setEmail(dto.getEmail());
      user = userRepository.saveAndFlush(user);
    }

    //Busca o filme pelo id do DTO
    Movie movie = movieRepository.findById(dto.getMovieId()).get();

    //Cria o objeto score e salva no banco.
    Score score = new Score();
    score.setMovie(movie);
    score.setUser(user);
    score.setValue(dto.getScore());

    score = scoreRepository.saveAndFlush(score);

    //Percorre a lista de scores e faz a média
    double sum = 0.0;
    for (Score s : movie.getScores()) {
      sum = sum + s.getValue();
    }
    
    double avg = sum / movie.getScores().size();

    //Atualiza a média e o count do movie.
    movie.setScore(avg);
    movie.setCount(movie.getScores().size());

    movie = movieRepository.save(movie);

  }

}

