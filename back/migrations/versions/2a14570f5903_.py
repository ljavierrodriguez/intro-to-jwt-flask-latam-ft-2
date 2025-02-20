"""empty message

Revision ID: 2a14570f5903
Revises: 
Create Date: 2025-02-19 15:56:32.051314

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2a14570f5903'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('biography', sa.String(), nullable=True),
    sa.Column('github', sa.String(), nullable=True),
    sa.Column('facebook', sa.String(), nullable=True),
    sa.Column('instagram', sa.String(), nullable=True),
    sa.Column('twitter', sa.String(), nullable=True),
    sa.Column('avatar', sa.String(), nullable=True),
    sa.Column('users_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['users_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('profiles')
    op.drop_table('users')
    # ### end Alembic commands ###
