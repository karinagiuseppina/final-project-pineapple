"""empty message

Revision ID: fd47b3a6d97e
Revises: 
Create Date: 2021-10-06 17:55:55.721078

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fd47b3a6d97e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('centro',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tipo', sa.String(length=20), nullable=False),
    sa.Column('peso', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('tipo')
    )
    op.create_table('pareja',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('opcion', sa.String(length=50), nullable=False),
    sa.Column('peso', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('opcion')
    )
    op.create_table('tiempo_proceso',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('menor_valor', sa.Integer(), nullable=False),
    sa.Column('mayor_valor', sa.Integer(), nullable=False),
    sa.Column('peso', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tratamiento',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tipo', sa.String(length=20), nullable=False),
    sa.Column('peso', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('tipo')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('edad', sa.Integer(), nullable=False),
    sa.Column('num_aborto', sa.Integer(), nullable=True),
    sa.Column('pareja_id', sa.Integer(), nullable=True),
    sa.Column('tiempo_proceso_id', sa.Integer(), nullable=True),
    sa.Column('centro_id', sa.Integer(), nullable=True),
    sa.Column('tratamiento_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['centro_id'], ['centro.id'], ),
    sa.ForeignKeyConstraint(['pareja_id'], ['pareja.id'], ),
    sa.ForeignKeyConstraint(['tiempo_proceso_id'], ['tiempo_proceso.id'], ),
    sa.ForeignKeyConstraint(['tratamiento_id'], ['tratamiento.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    op.drop_table('tratamiento')
    op.drop_table('tiempo_proceso')
    op.drop_table('pareja')
    op.drop_table('centro')
    # ### end Alembic commands ###
