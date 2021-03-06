class ProjectsController < ApplicationController
  before_action :set_project, only: [:edit, :update, :destroy]
  before_action :project_member?, only: [:edit, :update, :destroy]
  before_action :project_owner?, only: [:edit, :update, :destroy]

  def index
  end

  def new
    @project = Project.new
  end

  def create
    @project = Project.new(project_params)
    @project.owner_id = current_user.id
    @project.users << current_user
    if @project.save
      redirect_to root_path
    else
      @project.users.clear
      render :new
    end
  end

  def edit
  end

  def update
    if @project.update(project_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def destroy
    @project.destroy
    redirect_to root_path
  end

  private

  def project_params
    params.require(:project).permit(:name, user_ids: [])
  end

  def set_project
    @project = Project.find(params[:id])
  end

  def project_member?
    redirect_to root_path unless @project.users.include?(current_user)
  end

  def project_owner?
    redirect_to root_path unless @project.owner_id == current_user.id
  end
end
