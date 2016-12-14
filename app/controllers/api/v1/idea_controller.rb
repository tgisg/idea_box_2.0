class Api::V1::IdeaController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  before_filter :cors_check

  def index
    @ideas = Idea.all
    render json: @ideas
  end

  def create
    @idea = Idea.new(idea_params)
    render json: @idea if @idea.save
  end

  def destroy
    idea = Idea.find_by_id(params[:id])
    idea.destroy
    render json: {}, status: 204
  end

  def update
    @idea = Idea.find_by_id(params[:id])
    render json: @idea if @idea.update(idea_params)
  end

  def cors_check
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
    headers['Access-Control-Request-Method'] = '*'
    headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end
end
